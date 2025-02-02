const ValidationState = (()=>{
    const state = {
        email: { isValid: false, isNotDuplicate: false },
        name: { isValid: false, isNotDuplicate: false },
        password: { isValid: false, isMatch: false },
        profile: { isChanged: false }
    };

    //상태가 변경될 때 호출할 콜백 함수 저장
    // 여러 컴포넌트가 모듈이 상태 변화를 구독, 상태가 변경될 때 자동으로 업데이트.
    const subscribers = [];

    //setState: 특정 상태 값을 업데이트 함수
    //key : 업데이트 하려는 상태의 key (email,name)
    //value : 업데이트 하려는 상태의 값 (isValid,isNotDuplicate)
    //상태가 변경되면 notify 함수를 호출해 구독자에게 상태 변경을 알린다.
    const setState = (key,subKey,value) => {

        if (state.hasOwnProperty(key) && state[key].hasOwnProperty(subKey)) {
            state[key][subKey] = value;
            notify();
        }
    };

    //getState: 현재 상태를 반환하는 함수
    //반환값 state 객체를 복사한 새로운 객체를 반환
    const getState = () => ({...state});

    //상태 변경을 구독하는 함수
    //전달된 callback 함수를 subscribers 배열에 추가
    //상태가 변경될 때마다 해당 함수가 호출되도록 한다.
    const subscribe = (callback) => {
        subscribers.push(callback);
    };

    //모든 구독자들에게 현재 상태를 전달하여 알리는 함수
    //subscribers 배열에 저장된 콜백함수를 순회하면서 getState()를 호출하여 현재 상태를 반환
    //상태가 변경될때마다 모든 구독자가 최신 상태를 반영할 수 있다.
    const notify = () => {
        subscribers.forEach(callback => callback(getState()));
    };

    return { setState, getState, subscribe};
})();

export default ValidationState;