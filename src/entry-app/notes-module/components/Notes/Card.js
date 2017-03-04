import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import ItemTypes from './ItemTypes';
import {DragSource, DropTarget} from 'react-dnd';

const style = {
    // border         : '1px dashed gray',
    // padding        : '0.5rem 1rem',
    // marginBottom   : '.5rem',
    // backgroundColor: 'white',
    cursor         : 'move'
};

const cardSource = {
    beginDrag(props) {
        return {
            id   : props.id,
            index: props.index
        };
    }
};

const cardTarget = {
    hover(props, monitor, component) {
        const dragIndex  = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        const hoverClientX = clientOffset.x - hoverBoundingRect.left;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // no restrictions for wide space dragging
        // // Dragging downwards
        // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        //     return;
        // }
        //
        // // Dragging upwards
        // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        //     return;
        // }

        // Time to actually perform the action
        props.moveCard(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    },

    drop: function (props, monitor, component) {
        if (monitor.didDrop()) {
            // If you want, you can check whether some nested
            // target already handled drop
            return;
        }

        // Obtain the dragged item
        // var item = monitor.getItem();
        props.onDrop();

        // You can also do nothing and return a drop result,
        // which will be available as monitor.getDropResult()
        // in the drag source's endDrag() method
        return {moved: true};
    }
};
import IInsertDriveFile from 'react-icons/lib/md/insert-drive-file';
//Connect the component to Drag events
@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))

//Connect the component to Drop events
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging       : monitor.isDragging()
}))
export default class Card extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        index            : PropTypes.number.isRequired,
        isDragging       : PropTypes.bool.isRequired,
        id               : PropTypes.any.isRequired,
        text             : PropTypes.string.isRequired,
        moveCard         : PropTypes.func.isRequired,
        component        : PropTypes.element.isRequired,
        onDrop           : PropTypes.func.isRequired,
        preview          : PropTypes.element,
    };

    componentDidMount() {
        const {connectDragPreview} = this.props;
        var img = new Image();
        img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAAjElEQVR4Ae3QQQoCQQxE0TpNi7fsAwkjzr1GtF2q49Zdwg9IC/WzrwfRlLmDzrprD64L1nQNx0vEKTmPiS01XCCeCUAV4pUCcgQHAAGAmOAAJAAQExwABAAAQYBvIuyNAKkjAJwBAz8A9n8ADBgwYMDAozQ/YuBSApYYOOqG5zc1KUOs4FFDi5omzH0AKTxs0IK/AsAAAAAASUVORK5CYII=';
        img.onload = function () {
            connectDragPreview(img);
        };
    }

    render() {
        const {text, isDragging, connectDragSource, connectDropTarget, component} = this.props;
        const opacity                                                             = isDragging ? 0 : 1;

        return connectDragSource(connectDropTarget(
            <div style={{...style, opacity}}>
                {/*{text}*/}
                {component}
            </div>
        ));
    }
}