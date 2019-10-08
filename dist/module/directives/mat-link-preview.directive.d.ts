import { OnChanges, SimpleChanges } from '@angular/core';
import { NgxLinkifyjsService } from 'ngx-linkifyjs';
import { MatLinkPreviewService } from '../../module/service/mat-link-preview.service';
export declare class MatLinkPreviewDirective implements OnChanges {
    linkifyService: NgxLinkifyjsService;
    linkPreviewService: MatLinkPreviewService;
    input: string;
    constructor(linkifyService: NgxLinkifyjsService, linkPreviewService: MatLinkPreviewService);
    ngOnChanges(changes: SimpleChanges): void;
}
