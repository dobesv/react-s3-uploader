declare module 'react-s3-uploader' {
  import { Component } from 'react';

  export interface S3Response {
    signedUrl: string;
    headers?: Record<string, string> | null;
  }

  export interface ReactS3UploaderProps<R extends S3Response = S3Response> {
    signingUrl?: string;
    signingUrlMethod?: 'GET' | 'POST';
    getSignedUrl?: (file: File, callback: (params: R) => void) => void;
    accept?: string;
    s3path?: string;
    preprocess?: (file: File, next: (file: File) => void) => void;
    onSignedUrl?: (response: R) => void;
    onProgress?: (percent: number, status: string, file: File) => void;
    onError?: (message: string) => void;
    onFinish?: (result: R, file: File) => void;
    signingUrlHeaders?: {
      additional: object;
    };
    signingUrlQueryParams?: {
      additional: object;
    };
    signingUrlWithCredentials?: boolean;
    uploadRequestHeaders?: object;
    contentDisposition?: string;
    server?: string;
    inputRef?: (ref: HTMLInputElement) => any;
    autoUpload?: boolean;
    scrubFilename?: (filename: string) => string;
    [key: string]: any;
  }

  class ReactS3Uploader<R extends S3Response = S3Response> extends Component<ReactS3UploaderProps<R>, unknown> { }

  export default ReactS3Uploader;
}

declare module 'react-s3-uploader/s3upload' {
  import { ReactS3UploaderProps, S3Response } from 'react-s3-uploader';

  export interface S3UploadOptions<R extends S3Response = S3Response> extends Pick<
    ReactS3UploaderProps<R>,
    | 'contentDisposition'
    | 'getSignedUrl'
    | 'onProgress'
    | 'onError'
    | 'onSignedUrl'
    | 'preprocess'
    | 's3path'
    | 'server'
    | 'signingUrl'
    | 'signingUrlHeaders'
    | 'signingUrlMethod'
    | 'signingUrlQueryParams'
    | 'signingUrlWithCredentials'
    | 'uploadRequestHeaders'> {
    fileElement?: HTMLInputElement | null;
    files?: HTMLInputElement['files'] | null;
    onFinishS3Put?: ReactS3UploaderProps<R>['onFinish'];
    successResponses?: number[];
    scrubFilename?: (filename: string) => string;
  }

  class S3Upload<R extends S3Response = S3Response> {
    constructor(options: ReactS3UploaderProps<R>);
    abortUpload(): void;
    uploadFile(file: File): Promise<R>;
    uploadToS3(file: File, signResult: R): void;
  }

  export default S3Upload;
}
