//#region NameSpaces
import * as React from 'react';
import styles from './WpartTodaysTopi.module.scss';
import { IWpartTodaysTopiProps } from './IWpartTodaysTopiProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Confetti from 'react-confetti'
import { default as pnp, ItemAddResult, Web } from "sp-pnp-js";
////#endregion


export default class WpartTodaysTopi extends React.Component<IWpartTodaysTopiProps, {}> {
  public state: IWpartTodaysTopiProps;
  constructor(props, context) {
    super(props);
    this.state = {
      description: "",
      spHttpClient: this.props.spHttpClient,
      pageContext: this.props.pageContext,
      siteurl: this.props.siteurl,
      ProjectArray: [],
    }
  }


  componentDidMount() {
    this.fetchProjects();
  }
  fetchProjects() {
    var today = new Date;
    var date = today.getDay();
    var strToday = this.getcurrenday(date + 1);
    var NewISiteUrl = this.props.siteurl;
    var NewSiteUrl = NewISiteUrl.replace("/SitePages", "");
    let webx = new Web(NewSiteUrl);
    var TempComplteDropDown = [];
    webx.lists.getByTitle("Weekly Planner").items.filter("ID gt 0").get().then((items: any[]) => {
      if (items.length > 0) {
        for (var i = 0; i < items.length; i++) {
          var NewData = {
            Day: items[i].Title,
            Skills: items[i].Skills,
            URL: items[i].URL,
            NextTopic: items[i].NextTopic,
            GitHubLink: items[i].GitHubLink,
          }
          if (items[i].Title == strToday) {
            TempComplteDropDown.push(NewData);
          }
        }
        this.setState({
          ProjectArray: TempComplteDropDown
        });
      }
    });
  }


  public render(): React.ReactElement<IWpartTodaysTopiProps> {
    var SubProjectArrays = this.state.ProjectArray.map(function (item, i) {
      return <div>
        <div>
          <h4>{item["Day"]}</h4>
          <p>
            <h4>Topics</h4>
          </p>
          <p>
            {item["Skills"]}
          </p>
          <p>
            <a target="_blank" className={styles.achors} href={item["URL"]}> Current Topic</a>
          </p>
          <div className={styles.innerdiv}>
             <a target="_blank" className={styles.achors} href={item["GitHubLink"]}>Git Hub</a>
          </div>
          <div className={styles.innerdiv}>
            <a  target="_blank" className={styles.achors} href={item["NextTopic"]}> Nex Topic</a>
          </div>



        </div>


      </div>
    });
    return (
      <div className={styles.wpartTodaysTopi}>
        <div className={styles.container}>
          <div className={styles.row}>
            {SubProjectArrays}
            <Confetti

            />

          </div>
        </div>
      </div>
    );
  }

  getcurrenday(daynumber) {
    var result = "";
    switch (daynumber) {
      case 1:
        result = "Sunday";
        break;

      case 2:
        result = "Monday";
        break;

      case 3:
        result = "Tuesday";
        break;
      case 4:
        result = "Wednesday";
        break;
      case 5:
        result = "Thursday";
        break;
      case 6:
        result = "Friday";
        break;
      case 7:
        result = "Saturday";
        break;
    }
    return result;
  }
}
