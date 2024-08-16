import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import BlogItem from '../BlogItem'

import './index.css'

class BlogsList extends Component {
  state = {blogsData: [], isLoader: true}

  componentDidMount() {
    this.getBlogsList()
  }

  getBlogsList = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()

    const UpDatedData = data.map(eachitem => ({
      id: eachitem.id,
      title: eachitem.title,
      imageUrl: eachitem.image_url,
      avatarUrl: eachitem.avatar_url,
      author: eachitem.author,
      topic: eachitem.topic,
    }))
    this.setState({
      blogsData: UpDatedData,
      isLoader:false
    })
  }

  render() {
    const {blogsData, isLoader} = this.state
    return (
      <div className="blog-list-container">
        {isLoader ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          blogsData.map(item => <BlogItem blogData={item} key={item.id} />)
        )}
      </div>
    )
  }
}

export default BlogsList
