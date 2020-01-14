(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/common/http'), require('rxjs/operators'), require('ngx-linkifyjs'), require('@angular/material')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/common', '@angular/core', '@angular/common/http', 'rxjs/operators', 'ngx-linkifyjs', '@angular/material'], factory) :
    (global = global || self, factory(global.angularMaterialExtensionsLinkPreview = {}, global.ng.common, global.ng.core, global.ng.common.http, global.operators, global.ngxLinkifyjs, global.ng.material));
}(this, function (exports, common, core, http, operators, ngxLinkifyjs, material) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var MatLinkPreviewService = /** @class */ (function () {
        function MatLinkPreviewService(http) {
            var _this = this;
            this.http = http;
            this._accessKey = '';
            this._apiURL = 'https://api.linkpreview.net/';
            this.onLinkFound = new core.EventEmitter();
            this.links = [];
            this.onLinkFound.subscribe(function (links) { return _this.links = links; });
        }
        /**
         * @param {?} accessKey
         * @return {?}
         */
        MatLinkPreviewService.prototype.setAccessKey = /**
         * @param {?} accessKey
         * @return {?}
         */
        function (accessKey) {
            this._accessKey = accessKey;
        };
        /**
         * @param {?} url
         * @return {?}
         */
        MatLinkPreviewService.prototype.fetchLink = /**
         * @param {?} url
         * @return {?}
         */
        function (url) {
            /** @type {?} */
            var body = { key: this._accessKey, q: url };
            return this.http.post(this._apiURL, body).pipe(operators.map(function (value) { return (/** @type {?} */ (value)); }));
        };
        MatLinkPreviewService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        MatLinkPreviewService.ctorParameters = function () { return [
            { type: http.HttpClient }
        ]; };
        return MatLinkPreviewService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var MatLinkPreviewDirective = /** @class */ (function () {
        function MatLinkPreviewDirective(linkifyService, linkPreviewService, _elemRef) {
            this.linkifyService = linkifyService;
            this.linkPreviewService = linkPreviewService;
            this._elemRef = _elemRef;
        }
        /**
         * @return {?}
         */
        MatLinkPreviewDirective.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this._elemRef.nativeElement.oninput = function (inputEvent) {
                setTimeout(function () {
                    /** @type {?} */
                    var data = inputEvent.target.value;
                    /** @type {?} */
                    var links = _this.linkifyService.find(data);
                    _this.linkPreviewService.onLinkFound.emit(links);
                }, 2000);
            };
        };
        MatLinkPreviewDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[matLinkPreview]',
                        exportAs: '[matLinkPreview]',
                    },] },
        ];
        /** @nocollapse */
        MatLinkPreviewDirective.ctorParameters = function () { return [
            { type: ngxLinkifyjs.NgxLinkifyjsService },
            { type: MatLinkPreviewService },
            { type: core.ElementRef }
        ]; };
        return MatLinkPreviewDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var MatLinkPreviewComponent = /** @class */ (function () {
        function MatLinkPreviewComponent(linkPreviewService) {
            this.linkPreviewService = linkPreviewService;
            // forwarded from the container
            this.color = 'primary'; // accent | warn
            // accent | warn
            this.showLoadingsProgress = true;
        }
        /**
         * @return {?}
         */
        MatLinkPreviewComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.link && !this.linkPreview) {
                // this.loaded = false;
                this._subscription = this.linkPreviewService
                    .fetchLink(this.link.href)
                    .subscribe(function (value) { return _this.linkPreview = value; }, function (error) { return _this.hasError = true; }, function () { return _this.loaded = true; });
            }
        };
        /**
         * @return {?}
         */
        MatLinkPreviewComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            if (this._subscription) {
                this._subscription.unsubscribe();
            }
        };
        MatLinkPreviewComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mat-link-preview',
                        exportAs: 'matLinkPreview',
                        template: "\n    <ng-container *ngIf=\"!this.linkPreview && !this.loaded && this.showLoadingsProgress;then fetch else preview\">\n    </ng-container>\n    <ng-template #preview>\n      <mat-card *ngIf=\"this.linkPreview\">\n        <mat-card-content class=\"cut-text\">\n          <div class=\"img-container\" *ngIf=\"linkPreview.image\">\n            <img mat-card-image [src]=\"linkPreview?.image\">\n          </div>\n          <div>\n            <mat-card-title>{{linkPreview?.title}}</mat-card-title>\n            <mat-card-subtitle>{{linkPreview?.description}}</mat-card-subtitle>\n            <a [href]=\"linkPreview?.url\" mat-button [color]=\"color\">{{linkPreview?.url}}</a>\n          </div>\n        </mat-card-content>\n      </mat-card>\n    </ng-template>\n\n    <ng-template #fetch>\n      <mat-spinner *ngIf=\"!this.hasError\"></mat-spinner>\n    </ng-template>\n  ",
                        styles: ["\n    :host{display:block}mat-card-content{flex-direction:row;box-sizing:border-box;display:flex}mat-card-content a{padding-left:0;padding-right:0}.img-container{margin-right:1rem;place-content:center;align-items:center;flex-direction:row;box-sizing:border-box;display:flex;flex:1 1 100%;max-width:20%;padding:24px 16px}.center-auto{margin-left:auto!important;margin-right:auto!important}.cut-text{text-overflow:ellipsis;overflow:hidden}\n  "]
                    },] },
        ];
        /** @nocollapse */
        MatLinkPreviewComponent.ctorParameters = function () { return [
            { type: MatLinkPreviewService }
        ]; };
        MatLinkPreviewComponent.propDecorators = {
            link: [{ type: core.Input }],
            linkPreview: [{ type: core.Input }],
            color: [{ type: core.Input }],
            showLoadingsProgress: [{ type: core.Input }]
        };
        return MatLinkPreviewComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var MatLinkPreviewContainerComponent = /** @class */ (function () {
        function MatLinkPreviewContainerComponent(linkPreviewService) {
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
        MatLinkPreviewContainerComponent.prototype.trackLinks = /**
         * @param {?} index
         * @param {?} link
         * @return {?}
         */
        function (index, link) {
            return link ? link.href : undefined;
        };
        MatLinkPreviewContainerComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mat-link-preview-container',
                        exportAs: 'matLinkPreviewContainer',
                        template: "\n    <ng-container *ngIf=\"!multiple && linkPreviewService.links.length > 0; then first else list\"></ng-container>\n\n    <ng-template #first>\n      <mat-link-preview [link]=\"linkPreviewService?.links[0]\"\n                        [showLoadingsProgress]=\"showLoadingsProgress\">\n      </mat-link-preview>\n    </ng-template>\n    <ng-template #list>\n      <div *ngFor=\"let link of linkPreviewService.links; trackBy: trackLinks\">\n        <mat-link-preview [link]=\"link\"\n                          [showLoadingsProgress]=\"showLoadingsProgress\">\n        </mat-link-preview>\n      </div>\n    </ng-template>\n  ",
                        styles: ["\n    :host{display:block}\n  "]
                    },] },
        ];
        /** @nocollapse */
        MatLinkPreviewContainerComponent.ctorParameters = function () { return [
            { type: MatLinkPreviewService }
        ]; };
        MatLinkPreviewContainerComponent.propDecorators = {
            color: [{ type: core.Input }],
            multiple: [{ type: core.Input }],
            showLoadingsProgress: [{ type: core.Input }]
        };
        return MatLinkPreviewContainerComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var MatLinkPreviewModule = /** @class */ (function () {
        function MatLinkPreviewModule() {
        }
        /**
         * @return {?}
         */
        MatLinkPreviewModule.forRoot = /**
         * @return {?}
         */
        function () {
            return {
                ngModule: MatLinkPreviewModule,
                providers: [
                    MatLinkPreviewService,
                    ngxLinkifyjs.NgxLinkifyjsService,
                    {
                        provide: ngxLinkifyjs.NgxLinkifyjsConfigToken,
                        useValue: ngxLinkifyjs.DEFAULT_CONFIG
                    }
                ]
            };
        };
        MatLinkPreviewModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            http.HttpClientModule,
                            ngxLinkifyjs.NgxLinkifyjsModule,
                            material.MatCardModule,
                            material.MatButtonModule,
                            material.MatProgressSpinnerModule,
                        ],
                        exports: [MatLinkPreviewComponent, MatLinkPreviewContainerComponent, MatLinkPreviewDirective],
                        declarations: [MatLinkPreviewComponent, MatLinkPreviewContainerComponent, MatLinkPreviewDirective]
                    },] },
        ];
        return MatLinkPreviewModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */

    exports.MatLinkPreviewComponent = MatLinkPreviewComponent;
    exports.MatLinkPreviewContainerComponent = MatLinkPreviewContainerComponent;
    exports.MatLinkPreviewDirective = MatLinkPreviewDirective;
    exports.MatLinkPreviewModule = MatLinkPreviewModule;
    exports.MatLinkPreviewService = MatLinkPreviewService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=link-preview.umd.js.map