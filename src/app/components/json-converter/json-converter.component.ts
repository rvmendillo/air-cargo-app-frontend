import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-json-converter',
  templateUrl: './json-converter.component.html',
  styleUrls: ['./json-converter.component.css']
})
export class JsonConverterComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;

  jsonSource: string = '';
  formattedJsonSource: string = '';
  jsonLdResult: string = '';
  formattedJsonLdResult: string = '';
  showInsights: boolean = false;
  isDragging: boolean = false;
  clipboardText: string = 'Copy to Clipboard';
  clipboardIcon: string = 'content_copy';
  isConverting: boolean = false;
  parseError: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    if (event.dataTransfer?.files?.length) {
      this.readFile(event.dataTransfer.files[0]);
    }
  }

  onFileSelected(event: any) {
    if (event.target.files?.length) {
      this.readFile(event.target.files[0]);
    }
  }

  readFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const result = e.target.result;
      this.setJsonSource(result);
    };
    reader.readAsText(file);
  }

  setJsonSource(raw: string) {
    this.parseError = '';
    try {
      // Validate & pretty-print the incoming JSON
      const parsed = JSON.parse(raw);
      this.jsonSource = JSON.stringify(parsed, null, 2);
    } catch {
      this.parseError = 'Invalid JSON – please check your input.';
      this.jsonSource = raw;
    }
    this.formattedJsonSource = this.syntaxHighlight(this.jsonSource);
    this.jsonLdResult = '';
    this.formattedJsonLdResult = '';
    this.showInsights = false;
  }

  loadSample() {
    const sample = {
      "messageId": "MSG-A1R-99201",
      "issuedDate": "2024-10-24T14:30:00Z",
      "shipment": {
        "totalGrossWeight": 450.50,
        "totalPieces": 12,
        "origin": "LHR",
        "destination": "JFK",
        "dangerousGoods": {
          "unNumber": "3480",
          "dgrCategory": "Class 9 (Li-ion)"
        }
      }
    };
    this.setJsonSource(JSON.stringify(sample, null, 2));
  }

  triggerConversion() {
    if (this.jsonSource && !this.isConverting && !this.parseError) {
      this.isConverting = true;
      this.processJsonToJsonLd(this.jsonSource);
    }
  }

  copyToClipboard() {
    if (!this.jsonLdResult) return;
    navigator.clipboard.writeText(this.jsonLdResult).then(() => {
      this.clipboardText = 'Copied!';
      this.clipboardIcon = 'check';
      setTimeout(() => {
        this.clipboardText = 'Copy to Clipboard';
        this.clipboardIcon = 'content_copy';
      }, 2000);
    });
  }

  processJsonToJsonLd(json: string) {
    this.http.post('http://air-cargo-app-backend.vercel.app/api/convert-json', { json_data: json }).subscribe({
      next: (response: any) => {
        this.jsonLdResult = JSON.stringify(response, null, 2);
        this.formattedJsonLdResult = this.syntaxHighlight(this.jsonLdResult);
        this.isConverting = false;
        this.showInsights = false;
        setTimeout(() => {
          this.showInsights = true;
        }, 800);
      },
      error: (error: any) => {
        console.error('Conversion Failed', error);
        this.isConverting = false;
        this.jsonLdResult = JSON.stringify({ error: 'Communication with conversion API failed', details: error.message }, null, 2);
        this.formattedJsonLdResult = this.syntaxHighlight(this.jsonLdResult);
      }
    });
  }

  syntaxHighlight(json: string): string {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/(\"(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*\"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      let cls = 'text-primary';
      if (/^\"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'text-secondary';
        } else {
          cls = 'text-teal-600';
        }
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  }

  resetData() {
    this.jsonSource = '';
    this.formattedJsonSource = '';
    this.jsonLdResult = '';
    this.formattedJsonLdResult = '';
    this.showInsights = false;
    this.isConverting = false;
    this.parseError = '';

    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
