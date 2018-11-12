import React, { Component } from 'react';
import Modal from './Modal.js'
import styled from 'styled-components'
import axios from 'axios'
import moment from 'moment'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qiitaPostList : [],
      qiitaPostErrorStatus: true,
      videoAreaOpen: false,
    };
  }
  
  componentDidMount() {
    this.getItems((res) => {
      
      const list = res.data.map((d) => {
        return {
          title: d.title,
          body: d.body.match(/^.*/),
          url: d.url,
          tags: d.tags.map((x) => x.name),
          created_at: moment(d.created_at).format("YYYY/MM/DD HH:mm:ss"),
        }
      });
      this.setState({
        qiitaPostList: list,
        qiitaPostErrorStatus: false
      });
    });
  }

  getItems(callback) {
    const url = "https://qiita.com/api/v2/users/fukafuka_dev/items";
    axios.get(url)
    .then(function(response) {
      callback(response);
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  handleOpen = () => {
    this.setState({videoAreaOpen: true});
  }

  handleClose = () => {
    this.setState({videoAreaOpen: false});
  }

  render() {   
    const Title  = styled.span`
      font-family: 'Orbitron', sans-serif;
      font-size: 2rem;
      margin-right: 2rem;
      color: #2d2d2d;
    `
    
    const Display = styled.div`
      padding: 3rem;
      color: #2d2d2d;
      height: 400px;
    `

    const Header = styled.div`
      display: flex;
      align-items: center;
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;
      padding-left: 3rem;
      border-bottom: 1px solid #cecece;
    `

    const ContentHeader = styled.h2`
      font-family: 'Comfortaa', cursive;
      font-size: 1.8rem;
      margin-bottom: 1.2rem;
    `
    
    const Content = styled.div`
      margin-bottom: 3rem;
    `
    
    const GridContent = styled.div`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
      grid-auto-rows: auto;
      grid-gap: 0.8em;
      border: 1px solid #dd
    `
    
    const ContentItem = styled.div`
      overflow: auto;
      padding: 1rem;
      border: solid 1px #cecece;
      border-radius: 3px;
      line-height: 1.5rem;
    `

    const ContentLink = styled.a`
      display: inline-block;
      margin-bottom: 1.0rem;
      color: #428bca;
      text-decoration: none;
      
      :focus, :hover {
        color: #2a6496;
        text-decoration: underline;
      }
    `

    const Tag = styled.span`
      font-size: 0.8rem;
      padding: 0.2rem 0.5rem 0.2rem 0.5rem;
      background-color: #efefef;
      border-radius: 10px;
      margin-right: 0.3rem;
    `

    const Description = styled.div`
      margin-bottom: 1.2rem;
      line-height: 1.8;
    `

    const Date = styled.div`
      font-size: 0.8rem;
      width: 100%;
      text-align: right;
      color: #ababab;
    `

    const Image = styled.img`
      margin: 0 1rem 0 0;
      padding: 0;
    `

    const ImageWrapper = styled.div`
      display: flex;
      align-items: center;
    `

    const Indent = styled.div`
      padding-left: 1.2rem;
    `

    const VideoArea = styled.div`
      background-color: #ffffff;
      padding: 2rem;
      border-radius: 3px;
      width: 640px;
    `

    const Video = styled.video`
      border: 1px solid #000000;
    `

    const OpenNormalLink = ({children, href}) => {
      return <a href={href} target="_blank" rel="noreferrer noopener">{children}</a>
    }

    const OpenContentLink = ({children, href}) => {
      return <ContentLink href={href} target="_blank" rel="noreferrer noopener">{children}</ContentLink>
    }

    const HeaderMenu = () => (
      <Header>
        <Title>portfolio.</Title>
      </Header>
    )
    const About = () => (
      <Content>
        <ContentHeader>About</ContentHeader>
        <Description>
          <Indent>
            <p>
              業務では基幹系Webシステムの開発、運用、保守を行っていました。技術的にはJava(Seasar2/Spring)、Oracleなど。
            </p>
            <p>
              個人ではJavascript(Node.js)/Python/Ruby on Railsなどを勉強しています。
            </p>
          </Indent>
        </Description>
      </Content>
    )

    const Links = () => (
      <Content>
        <ContentHeader>Links</ContentHeader>
        <Description>
          <Indent>
            <ImageWrapper>
              <OpenNormalLink href="https://qiita.com/fukafuka_dev">
                <Image height="36" width="36" src="https://unpkg.com/simple-icons@latest/icons/qiita.svg" />
              </OpenNormalLink>
              <OpenNormalLink href="https://github.com/fukafuka-dev/">
                <Image height="24" width="24" src="https://unpkg.com/simple-icons@latest/icons/github.svg" />
              </OpenNormalLink>
            </ImageWrapper>
          </Indent>
        </Description>
      </Content>
    )

    const Tags = (list) => {
      return (list.list.map((tag, i) => <Tag key={i}>{tag}</Tag>))
    }

    const Works = () => (
      <Content>
        <ContentHeader>Works</ContentHeader>
        <GridContent>
          <ContentItem>
            <OpenContentLink href="https://protomemo.fukafuka-app.com/" target="_blank">Protomemo</OpenContentLink>
            <Description>
              <p>
                Markdown対応のメモアプリです。
              </p>
              <p>
                デモユーザー"guest/guest12345"でログイン可能です。
              </p>        
            </Description>
            <Tags list={["Javascript", "React", "Python", "Flask", "PostgreSQL", "nginx", "docker"]}></Tags>
          </ContentItem>
          <ContentItem>
            <OpenContentLink href="https://normaled.fukafuka-app.com/" target="_blank">normaled</OpenContentLink>
            <Description>
              <p>
                3DCGで利用されるノーマルマップと呼ばれるテクスチャ画像を作成するアプリです。
              </p>
              <p>
                アップロードした画像の変換が可能です。
              </p>
            </Description>
            <Tags list={["Javascript", "WebGL", "HTML5(Canvas)", "webpack"]}></Tags>
          </ContentItem>
          <ContentItem>
            <ContentLink href="#" onClick={this.handleOpen}>noiseq</ContentLink>
            <Description>
              <Modal
                open={this.state.videoAreaOpen}
                onClose={this.handleClose.bind(this)}
              >
                <VideoArea>
                  <p>※音が流れます</p>
                  <Video controls width="640">
                    <source src={`${process.env.PUBLIC_URL}/noiseq.mp4`} type="video/mp4" />
                    <a href={`${process.env.PUBLIC_URL}/noiseq.mp4`}>start video.</a>
                  </Video>
                </VideoArea>
              </Modal>
              <p>
                往年の8bitサウンドを再現した音源とピアノロール型シーケンサを搭載した作曲ソフトです。
              </p>
              <p>
                WaveTable式によるファミコン風音源と4オペレータのFM音源を実装しています。
              </p>
            </Description>
            <Tags list={["Java"]}></Tags>
          </ContentItem>
          <ContentItem>
            <OpenContentLink href="/">portfolio</OpenContentLink>
            <Description>
              <p>
                このページです。自分のアウトプットをまとめて置くために作りました。
              </p>
            </Description>
            <Tags list={["Javascript", "React"]}></Tags>
          </ContentItem>
        </GridContent>
      </Content>
    )

    const Posts = () => (
      <Content>
        <ContentHeader>Recent Qiita Posts</ContentHeader>
        {
            this.state.qiitaPostErrorStatus
            ? 
            <ContentItem>API取得エラーが発生しました。</ContentItem>
            :
            <GridContent>
              {this.state.qiitaPostList.map((d, i) => (
                <ContentItem key={i}>
                  <OpenContentLink href={d.url}>{d.title}</OpenContentLink>
                  <Description>
                    {d.body}
                  </Description>
                  <Tags list={d.tags}></Tags>
                  <Date>created at: {d.created_at}</Date>
                </ContentItem>
              ))}
            </GridContent>
        }
      </Content>
    )

    return (
      <>
        <HeaderMenu />
        <Display>
          <About />
          <Links />
          <Works />
          <Posts />
        </Display>
      </>

    );
  }
}

export default App;
