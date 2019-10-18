import { ElementRef, OnInit } from '@angular/core';
import { NgxLinkifyjsService } from 'ngx-linkifyjs';
import { MatLinkPreviewService } from '../../module/service/mat-link-preview.service';
export declare class MatLinkPreviewDirective implements OnInit {
    linkifyService: NgxLinkifyjsService;
    linkPreviewService: MatLinkPreviewService;
    private _elemRef;
    constructor(linkifyService: NgxLinkifyjsService, linkPreviewService: MatLinkPreviewService, _elemRef: ElementRef);
    ngOnInit(): void;
}
