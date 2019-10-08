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
            this._accessKey = '5b54e80a65c77848ceaa4630331e8384950e09d392365';
            this._apiURL = 'https://api.linkpreview.net/';
            this.onLinkFound = new core.EventEmitter();
            this.links = [];
            this.onLinkFound.subscribe(function (links) { return _this.links = links; });
        }
        /**
         * @param {?} url
         * @return {?}
         */
        MatLinkPreviewService.prototype.fetchLink = /**
         * @param {?} url
         * @return {?}
         */
        function (url) {
            console.log('fetching the following link: ', url);
            /** @type {?} */
            var params = new http.HttpParams()
                .append('key', this._accessKey)
                .append('q', url);
            return this.http.get(this._apiURL, { params: params }).pipe(operators.map(function (value) { return (/** @type {?} */ (value)); }));
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
        function MatLinkPreviewDirective(linkifyService, linkPreviewService) {
            this.linkifyService = linkifyService;
            this.linkPreviewService = linkPreviewService;
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        MatLinkPreviewDirective.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.input && changes.input.currentValue) {
                /** @type {?} */
                var data = changes.input.currentValue;
                /** @type {?} */
                var links = this.linkifyService.find(data);
                this.linkPreviewService.onLinkFound.emit(links);
            }
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
            { type: MatLinkPreviewService }
        ]; };
        MatLinkPreviewDirective.propDecorators = {
            input: [{ type: core.Input }]
        };
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
