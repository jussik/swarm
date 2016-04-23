declare module "draggabilly" {
    interface Draggabilly {
        on(eventName: string, handler: (event: Event, pointer: MouseEvent | Touch, moveVector: { x: number, y: number }) => void): void;
        off(eventName: string, handler: (event: Event, pointer: MouseEvent | Touch, moveVector: { x: number, y: number }) => void): void;
        once(eventName: string, handler: (event: Event, pointer: MouseEvent | Touch, moveVector: { x: number, y: number }) => void): void;
    }
    interface DraggabillyFactory {
        new (selector: Element | string, opts?: any): Draggabilly;
    }
    var Draggabilly: DraggabillyFactory;
    export = Draggabilly;
}