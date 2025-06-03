
import { _decorator, Component, Node, tween, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('Ground')
export class Ground extends Component {
    @property({
        group: {name: 'Group', id: '1'},
        type: Node,
        tooltip: 'First Ground',
        displayName: 'Firt Ground',
        visible: true
    })
    public _ground1: Node;

    @property({
        group: {name: 'Group', id: '1'},
        type: Node,
        tooltip: 'Last Ground',
        displayName: 'Last Ground',
        visible: true
    })
    public _ground2: Node;

    @property(Number)
    public minX: number;

    @property(Number)
    public speed: number;

    private lastPos: Vec3;

    protected onLoad(): void {
        this.lastPos = this._ground2.position.clone();
    }

    protected update(dt: number): void {
        this.runGround();
    }

    /* Cho Ground di chuyển sang trái
    */
    runGround(): void{
        let currentPos = this.node.position;
        let newPos = currentPos.add(new Vec3(-1 * this.speed, 0, 0));

        this.node.setPosition(newPos);

        if(currentPos.x <= this.minX){
            this.node.setPosition(this.lastPos);
        }
    }

}