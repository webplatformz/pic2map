const mockTrip = {
    meta: {
        name: 'Zoo Juni 2018',
        key: 'asd3451adad',
        imageCount: 11
    },
    images: [
        {key: 'a', date: '2011-10-05T14:48:00.000Z', title: 'Elefant im Zoo'},
        {key: 'b', date: '2011-01-22T14:48:00.000Z', title: 'Tiger im Zoo'},
        {key: 'c', date: '2011-11-29T14:48:00.000Z', title: 'Löwe im Zoo'},
        {key: 'd', date: '2011-12-11T14:48:00.000Z', title: 'Pinugin im Zoo'},
        {key: 'e', date: '2011-03-03T14:48:00.000Z', title: 'Pelikan im Zoo'},
        {key: 'f', date: '2011-04-16T14:48:00.000Z', title: 'Affen im Zoo'},
        {key: 'g', date: '2011-11-29T14:48:00.000Z', title: 'Löwe im Zoo'},
        {key: 'h', date: '2011-12-11T14:48:00.000Z', title: 'Pinugin im Zoo'},
        {key: 'i', date: '2011-03-03T14:48:00.000Z', title: 'Pelikan im Zoo'},
        {key: 'j', date: '2011-04-16T14:48:00.000Z', title: 'Affen im Zoo'},
    ]
};

const defaultState = {meta: {}, images: []};
export default function tripReducer(state = defaultState, action) {
    switch (action.type) {
        case 'LOAD_TRIP':
            return Object.assign({}, mockTrip);

        default:
            return state;
    }
}