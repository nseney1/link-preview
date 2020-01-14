import { EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Link } from 'ngx-linkifyjs';
import { LinkPreview } from '../..';
export declare class MatLinkPreviewService {
    private http;
    private _accessKey;
    private _apiURL;
    onLinkFound: EventEmitter<Array<Link>>;
    links: Link[];
    constructor(http: HttpClient);
    setAccessKey(accessKey: string): void;
    fetchLink(url: string): Observable<LinkPreview>;
}
