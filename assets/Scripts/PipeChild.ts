
import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('PipeChild')
export class PipeChild extends Component {
    private currentPos: Vec3;

    protected update(dt: number): void {
        this.setPos();
    }

    //Cập nhật vị trí của thành phần ống theo node cha (Rigidbody2D.type = Animated)
    setPos(): void{
        let newPos = new Vec3(0, this.node.position.y, 0);

        this.node.setPosition(newPos);
    }
}