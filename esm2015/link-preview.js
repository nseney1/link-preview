import { CommonModule } from '@angular/common';
import { EventEmitter, Injectable, Directive, ElementRef, Component, Input, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NgxLinkifyjsService, NgxLinkifyjsConfigToken, DEFAULT_CONFIG, NgxLinkifyjsModule } from 'ngx-linkifyjs';
import { MatCardModule, MatButtonModule, MatProgressSpinnerModule } from '@angular/material';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class MatLinkPreviewService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        this._accessKey = '';
        this._apiURL = 'https://api.linkpreview.net/';
        this.onLinkFound = new EventEmitter();
        this.links = [];
        this.onLinkFound.subscribe((links) => this.links = links);
    }
    /**
     * @param {?} accessKey
     * @return {?}
     */
    setAccessKey(accessKey) {
        this._accessKey = accessKey;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    fetchLink(url) {
        /** @type {?} */
        const body = { key: this._accessKey, q: url };
        return this.http.post(this._apiURL, body).pipe(map(value => (/** @type {?} */ (value))));
    }
}
MatLinkPreviewService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
MatLinkPreviewService.ctorParameters = () => [
    { type: HttpClient }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class MatLinkPreviewDirective {
    /**
     * @param {?} linkifyService
     * @param {?} linkPreviewService
     * @param {?} _elemRef
     */
    constructor(linkifyService, linkPreviewService, _elemRef) {
        this.linkifyService = linkifyService;
        this.linkPreviewService = linkPreviewService;
        this._elemRef = _elemRef;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._elemRef.nativeElement.oninput = (inputEvent) => {
            setTimeout(() => {
                /** @type {?} */
                const data = inputEvent.target.value;
                /** @type {?} */
                const links = this.linkifyService.find(data);
                this.linkPreviewService.onLinkFound.emit(links);
            }, 2000);
        };
    }
}
MatLinkPreviewDirective.decorators = [
    { type: Directive, args: [{
                selector: '[matLinkPreview]',
                exportAs: '[matLinkPreview]',
            },] },
];
/** @nocollapse */
MatLinkPreviewDirective.ctorParameters = () => [
    { type: NgxLinkifyjsService },
    { type: MatLinkPreviewService },
    { type: ElementRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class MatLinkPreviewComponent {
    /**
     * @param {?} linkPreviewService
     */
    constructor(linkPreviewService) {
        this.linkPreviewService = linkPreviewService;
        // forwarded from the container
        this.color = 'primary'; // accent | warn
        // accent | warn
        this.showLoadingsProgress = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.link && !this.linkPreview) {
            // this.loaded = false;
            this._subscription = this.linkPreviewService
                .fetchLink(this.link.href)
                .subscribe(value => this.linkPreview = value, error => this.hasError = true, () => this.loaded = true);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    }
}
MatLinkPreviewComponent.decorators = [
    { type: Component, args: [{
                selector: 'mat-link-preview',
                exportAs: 'matLinkPreview',
                template: `
    <ng-container *ngIf="!this.linkPreview && !this.loaded && this.showLoadingsProgress;then fetch else preview">
    </ng-container>
    <ng-template #preview>
      <mat-card *ngIf="this.linkPreview">
        <mat-card-content class="cut-text">
          <div class="img-container" *ngIf="linkPreview.image">
            <img mat-card-image [src]="linkPreview?.image">
          </div>
          <div>
            <mat-card-title>{{linkPreview?.title}}</mat-card-title>
            <mat-card-subtitle>{{linkPreview?.description}}</mat-card-subtitle>
            <a [href]="linkPreview?.url" mat-button [color]="color">{{linkPreview?.url}}</a>
          </div>
        </mat-card-content>
      </mat-card>
    </ng-template>

    <ng-template #fetch>
      <mat-spinner *ngIf="!this.hasError"></mat-spinner>
    </ng-template>
  `,
                styles: [`
    :host{display:block}mat-card-content{flex-direction:row;box-sizing:border-box;display:flex}mat-card-content a{padding-left:0;padding-right:0}.img-container{margin-right:1rem;place-content:center;align-items:center;flex-direction:row;box-sizing:border-box;display:flex;flex:1 1 100%;max-width:20%;padding:24px 16px}.center-auto{margin-left:auto!important;margin-right:auto!important}.cut-text{text-overflow:ellipsis;overflow:hidden}
  `]
            },] },
];
/** @nocollapse */
MatLinkPreviewComponent.ctorParameters = () => [
    { type: MatLinkPreviewService }
];
MatLinkPreviewComponent.propDecorators = {
    link: [{ type: Input }],
    linkPreview: [{ type: Input }],
    color: [{ type: Input }],
    showLoadingsProgress: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class MatLinkPreviewContainerComponent {
    /**
     * @param {?} linkPreviewService
     */
    constructor(linkPreviewService) {
        this.linkPreviewService = linkPreviewService;
        // to forward
        this.color = 'primary'; // accent | warn
        this.showLoadingsProgress = true;
    }
    /**
     * @param {?} index
     * @param {?} link
     * @return {?}
     */
    trackLinks(index, link) {
        return link ? link.href : undefined;
    }
}
MatLinkPreviewContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'mat-link-preview-container',
                exportAs: 'matLinkPreviewContainer',
                template: `
    <ng-container *ngIf="!multiple && linkPreviewService.links.length > 0; then first else list"></ng-container>

    <ng-template #first>
      <mat-link-preview [link]="linkPreviewService?.links[0]"
                        [showLoadingsProgress]="showLoadingsProgress">
      </mat-link-preview>
    </ng-template>
    <ng-template #list>
      <div *ngFor="let link of linkPreviewService.links; trackBy: trackLinks">
        <mat-link-preview [link]="link"
                          [showLoadingsProgress]="showLoadingsProgress">
        </mat-link-preview>
      </div>
    </ng-template>
  `,
                styles: [`
    :host{display:block}
  `]
            },] },
];
/** @nocollapse */
MatLinkPreviewContainerComponent.ctorParameters = () => [
    { type: MatLinkPreviewService }
];
MatLinkPreviewContainerComponent.propDecorators = {
    color: [{ type: Input }],
    multiple: [{ type: Input }],
    showLoadingsProgress: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class MatLinkPreviewModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MatLinkPreviewModule,
            providers: [
                MatLinkPreviewService,
                NgxLinkifyjsService,
                {
                    provide: NgxLinkifyjsConfigToken,
                    useValue: DEFAULT_CONFIG
                }
            ]
        };
    }
}
MatLinkPreviewModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    HttpClientModule,
                    NgxLinkifyjsModule,
                    MatCardModule,
                    MatButtonModule,
                    MatProgressSpinnerModule,
                ],
                exports: [MatLinkPreviewComponent, MatLinkPreviewContainerComponent, MatLinkPreviewDirective],
                declarations: [MatLinkPreviewComponent, MatLinkPreviewContainerComponent, MatLinkPreviewDirective]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

export { MatLinkPreviewComponent, MatLinkPreviewContainerComponent, MatLinkPreviewDirective, MatLinkPreviewModule, MatLinkPreviewService };
//# sourceMappingURL=link-preview.js.map