import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'WpartTodaysTopiWebPartStrings';
import WpartTodaysTopi from './components/WpartTodaysTopi';
import { IWpartTodaysTopiProps } from './components/IWpartTodaysTopiProps';
import { SPHttpClient } from '@microsoft/sp-http';


export interface IWpartTodaysTopiWebPartProps {
  description: string;
  spHttpClient: SPHttpClient;

}

export default class WpartTodaysTopiWebPart extends BaseClientSideWebPart<IWpartTodaysTopiWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IWpartTodaysTopiProps > = React.createElement(
      WpartTodaysTopi,
      {
        description: this.properties.description,
        spHttpClient: this.context.spHttpClient,
        pageContext: this.context.pageContext,
        siteurl:this.context.pageContext.web.absoluteUrl,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
