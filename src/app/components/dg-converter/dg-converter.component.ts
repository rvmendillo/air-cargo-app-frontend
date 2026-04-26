import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatbotService } from '../../services/chatbot.service';

@Component({
  selector: 'app-dg-converter',
  templateUrl: './dg-converter.component.html',
  styleUrls: ['./dg-converter.component.css']
})
export class DgConverterComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;

  sidebarHidden = false;
  private readonly MOBILE_BREAKPOINT = 768;

  @HostListener('window:resize')
  onResize() {
    this.sidebarHidden = window.innerWidth <= this.MOBILE_BREAKPOINT;
  }

  xmlSource: string = '';
  formattedXmlSource: string = '';
  jsonResult: string = '';
  formattedJsonResult: string = '';
  showInsights: boolean = false;
  isDragging: boolean = false;
  clipboardText: string = 'Copy to Clipboard';
  clipboardIcon: string = 'content_copy';
  isConverting: boolean = false;

  constructor(private http: HttpClient, private chatbotService: ChatbotService) { }

  ngOnInit(): void {
    this.sidebarHidden = window.innerWidth <= this.MOBILE_BREAKPOINT;
  }

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
      this.xmlSource = result;
      this.formattedXmlSource = this.formatXml(this.xmlSource);
      this.jsonResult = '';
      this.formattedJsonResult = '';
      this.showInsights = false;
      this.chatbotService.updateXmlContext(this.xmlSource);
    };
    reader.readAsText(file);
  }

  formatXml(xml: string): string {
    let formatted = xml.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    formatted = formatted.replace(/(&lt;\/?)([a-zA-Z0-9_:-]+)(&gt;)/g, '<span class="text-blue-600">$1$2$3</span>');
    return formatted;
  }

  loadSample() {
    this.xmlSource = `<MasterAirWaybill>
  <MessageHeader>
    <ID>MSG-A1R-99201</ID>
    <IssuedDate>2024-10-24T14:30:00Z</IssuedDate>
  </MessageHeader>
  <Shipment>
    <TotalGrossWeight>450.50</TotalGrossWeight>
    <TotalPcs>12</TotalPcs>
    <Origin>LHR</Origin>
    <Destination>JFK</Destination>
    <DangerousGoods>
      <UNNumber>3480</UNNumber>
      <DGRCategory>Class 9 (Li-ion)</DGRCategory>
    </DangerousGoods>
  </Shipment>
</MasterAirWaybill>`;

    this.formattedXmlSource = this.formatXml(this.xmlSource);
    this.jsonResult = '';
    this.formattedJsonResult = '';
    this.showInsights = false;
    this.chatbotService.updateXmlContext(this.xmlSource);
  }

  triggerConversion() {
    if (this.xmlSource && !this.isConverting) {
      this.isConverting = true;
      this.processXmlToJson(this.xmlSource);
    }
  }

  copyToClipboard() {
    if (!this.jsonResult) return;
    navigator.clipboard.writeText(this.jsonResult).then(() => {
      this.clipboardText = 'Copied!';
      this.clipboardIcon = 'check';
      setTimeout(() => {
        this.clipboardText = 'Copy to Clipboard';
        this.clipboardIcon = 'content_copy';
      }, 2000);
    });
  }

  processXmlToJson(xml: string) {
    this.http.post('http://localhost:8000/api/convert', { xml_data: xml }).subscribe({
      next: (response: any) => {
        this.jsonResult = JSON.stringify(response, null, 2);
        this.formattedJsonResult = this.syntaxHighlight(this.jsonResult);
        this.isConverting = false;
        
        // show AI insights
        this.showInsights = false;
        setTimeout(() => {
          this.showInsights = true;
        }, 800);
      },
      error: (error: any) => {
        console.error('Conversion Failed', error);
        this.isConverting = false;
        this.jsonResult = JSON.stringify({ error: 'Communication with conversion API failed', details: error.message }, null, 2);
        this.formattedJsonResult = this.syntaxHighlight(this.jsonResult);
      }
    });
  }

  syntaxHighlight(json: string): string {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = 'text-primary'; // numbers, booleans
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'text-secondary'; // key
            } else {
                cls = 'text-teal-600'; // string value
            }
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
  }

  resetData() {
    this.xmlSource = '';
    this.formattedXmlSource = '';
    this.jsonResult = '';
    this.formattedJsonResult = '';
    this.showInsights = false;
    this.isConverting = false;
    
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

}
