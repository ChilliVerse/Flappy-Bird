
import { _decorator, Component, Input, Node, RigidBody2D, Vec2, input, game, Collider2D, Contact2DType, UITransform, Vec3, Animation, director, PhysicsSystem2D } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('Bird')
export class Bird extends Component {

    @property({
        type: Number,
        tooltip: 'maxY'
    })
    public maxY: number = null;

    private rigidbody2D: RigidBody2D;

    @property(Vec2)
    public force: Vec2 = null;

    public anim: Animation;

    protected onLoad(): void {
        this.anim = this.node.getComponent(Animation);
        this.rigidbody2D = this.node.getComponent(RigidBody2D);

        input.on(Input.EventType.TOUCH_START, this.applyForceToFly, this);

        this.node.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT, this.checkCollider, this);
    }

    protected update(dt: number): void {
        this.checkPos();
    }

    applyForceToFly(): void{
        this.rigidbody2D.applyLinearImpulseToCenter(this.force, true);
    }

    //Kiểm tra va chạm với collider kháckhác
    checkCollider(): void{
        director.emit('EndGame');
    }

    //Giới hạn chiều cao bay
    checkPos(): void{
        if(this.node.position.y >= this.maxY){
            this.node.position = new Vec3(this.node.position.x, this.maxY - 1, this.node.position.z)
        }
    }
}