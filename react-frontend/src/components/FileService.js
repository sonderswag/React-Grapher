
import axios from 'axios';

class FileService {

  saveCollection(name,callback) {
    axios.post('http://localhost:4200/file',name)
    .then(response => {
      console.log(response)
      callback(null)
    })
  }

  getSavedCollectionList(callback) {
    axios.get('http://localhost:4200/file')
    .then(response => {
      callback(null,response.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  loadCollection(name,callback) {
    console.log('http://localhost:4200/file/'+name)
    axios.get('http://localhost:4200/file/'+name)
    .then(response => {
      callback(null,response.data)
    })
    .catch(function(err) {
      console.log(err)
    })
  }

  deleteCollection(name,callback) {
    axios.delete('http://localhost:4200/file/'+name)
    .then(response => {
      callback(null)
    })
    .catch(function(err) {
      console.log(err)
    })
  }

}

export default new FileService()
