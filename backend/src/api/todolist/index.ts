export default (app) => {
    app.get(
        `/todolist`,
        require('./todolistList').default
    );
    app.delete(
        `/todolist`,
        require('./todolistDestroy').default
    );
    // app.get(
    //     `/todolist/:id`,
    //     require('./todolistFind').default
    // );
    app.post(
        `/todolist`,
        require('./todolistCreate').default
    );
} 