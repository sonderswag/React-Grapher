import axios from 'axios';

//TODO:: add in the correct error handleling for the different html status codes

class TraceService {
  //data should be in the following format:
  // {type: '', params:{}}
  sendTrace(data, callback) {
    axios.post('http://localhost:4200/trace',
      data)
    .then((response) => {
      // console.log(response)
      callback(response)
    })
    .catch((error) => {
      console.log(error)
    });
  }

  getTrace(id,callback) {
    console.log(id)
    axios.get('http://localhost:4200/trace/'+id)
    .then(response => {
      // console.log('response',response);
      callback(null,response.data)
    })
    .catch((error) => {
      console.log(error);
      callback(error)
    })
  }

  getList(callback) {
    axios.get('http://localhost:4200/trace')
    .then(response => {
      // console.log(response)
      callback(null,response.data)
    })
    .catch(error => {
      console.log(error);
      callback(error)
    })
  }

  getTraceIds(callback) {
    axios.get('http://localhost:4200/trace/ids')
    .then(response => {
      callback(null,response.data)
    })
    .catch((error) => {
      console.log(error)
      callback(error)
    })
  }

  deleteTrace(id, callback) {
    axios.delete('http://localhost:4200/trace/'+id)
    .then(response => {
      // console.log(response)
      callback(null,response.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  deleteAll(callback) {
    axios.delete('http://localhost:4200/trace/')
    .then(response => {
      // console.log(response)
      callback(null,response.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  //update Trace should be in the following format
  //{type: '', params:{}}
  updateTrace(id, updateTrace, callback) {
    axios.patch('http://localhost:4200/trace/'+id, updateTrace)
    .then(response => {
      // console.log(response)
      callback(null,response.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

}

export default new TraceService()
