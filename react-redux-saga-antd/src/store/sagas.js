import {all, call, fork, put, take,} from 'redux-saga/effects';
import {userActions} from './user';
import {request} from '../utils/http';

function* sendRequest(data){
  try{
      const res = yield call(request, data);          
      yield put(data.sucess(res.data));
  }
  catch(error){
      yield put(data.error(error.response));
  }
}

//=====================================
//  WATCHERS
//-------------------------------------


function* watchSendRequest(){
  while(true){
      const {payload} = yield take(userActions.REQUEST);
      yield fork(sendRequest, {...payload});        
  }
}
//=====================================
//  INIT SAGAS
//-------------------------------------

export const http = [
  fork(watchSendRequest),    
];

export default function* sagas() {  
  yield all([  
    ...http
  ]);
}