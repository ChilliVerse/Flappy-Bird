
import { _decorator, Component, CurveRange, director, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('Pipe')
export class Pipe extends Component {
    
    @property({
        type: Number,
        tooltip: 'Speed'
    })
    public speed: number = null;

    @property({
        type: Vec3,
        tooltip: 'Position to Deleted'
    })
    public endPos: Vec3 = null;

    public isPass: boolean;

    protected onLoad(): void {
        this.isPass = false;
    }
    
    protected update(dt: number): void {
        this.runPipe();

        this.removePipe();

        this.checkPass();
    }

    // Cho ống di chuyển sang trái
    runPipe(): void{
        let currentPos = this.node.position;

        let newPos = currentPos.add(new Vec3(-1 * this.speed, 0, 0));

        this.node.setPosition(newPos);
    }

    // Nếu ống ra ngoài phạm vi cho phép thì xóa node 
    removePipe(): void{
        if(this.node.position.x <= this.endPos.x){
            this.node.destroy();
        }
    }

    // Kiểm tra ống đã qua vị trí bird chưa (Bird luôn có tọa độ x = 0)
    checkPass(): void{
        if(Math.floor(this.node.position.x) === 0){
            this.isPass = true;
            director.emit('Pass');
        }
        else{
            this.isPass = false;
        }
    }
}