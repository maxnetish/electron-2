(function (document) {
    var React = require('react');
    var ReactDOM = require('react-dom');
    var entryNode = document.getElementById('react-entry-point');

    ReactDOM.render(
        <div className="container-fluid">
            <h3>Hello, world of react & electron!</h3>
            <div className="row">
                <div className="col-xs-2 text-right">Node</div>
                <div className="col-xs-2">{process.versions.node}</div>
            </div>
            <div className="row">
                <div className="col-xs-2 text-right">Chrome</div>
                <div className="col-xs-2">{process.versions.chrome}</div>
            </div>
            <div className="row">
                <div className="col-xs-2 text-right">Electron</div>
                <div className="col-xs-2">{process.versions.electron}</div>
            </div>
            <div className="row">
                <div className="col-xs-2 text-right">React</div>
                <div className="col-xs-2">{React.version}</div>
            </div>
        </div>,
        entryNode
    );
})(document);
