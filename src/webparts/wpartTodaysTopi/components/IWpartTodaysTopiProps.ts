import { SPHttpClient, } from '@microsoft/sp-http';
import { Context } from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { PageContext } from '@microsoft/sp-page-context';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';

export interface IWpartTodaysTopiProps {
  description: string;
  spHttpClient: SPHttpClient;
  pageContext: PageContext;
  siteurl: string,
  ProjectArray:Array<object>;
}
