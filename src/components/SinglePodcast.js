import React from 'react'
// import axios from 'axios'

// export default class SinglePodcast extends React.Component{
//   constructor(){
//     super()
//     this.state = {
//       allPodcasts: []
//     }
//   }

//   async componentDidMount(){
//     const url = `${process.env.REACT_APP_API}`
//     const response = await axios.get(url)
//     const podcastData = response.data.podcasts;
//     this.setState({
//            allPodcasts: podcastData
//      })
//   }


//   render(){
//     return(
//       <div>
//         <div>
//         {this.state.allPodcasts.map((podcast) => { return(
//           <div>
//             <h2>{podcast.name}</h2>
//             <p>{podcast.title}</p>
//           </div>

//         )})}
//         </div>

//       </div>
//     )
//   }
// }

export default function SinglePodcast(props){
  const podcasts = props.podcasts
  console.log(podcasts)
  return(
    <div className='podcast'>
      <div>
        <div>
          {podcasts.map(podcast =>{return(
            <div>
            <img src = {podcast.image} />
            <h2>{podcast.name}</h2>
            <p>{podcast.title}</p>
            </div>
          )})}
        </div>
        
      </div>
    </div>
  )
}