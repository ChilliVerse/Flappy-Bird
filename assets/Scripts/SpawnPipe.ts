import { _decorator, Component, instantiate, Node, Prefab, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('SpawnPipe')
export class SpawnPipe extends Component {
    @property({
        type: Prefab,
        tooltip: 'Pipe Prefabs',
        displayName: 'Pipe'
    })
    public pipe: Prefab = null;

    @property({
        type: Vec3,
        tooltip: 'position to Delete',
        displayName: 'start Pos',
        visible: true
    })
    public _startPos: Vec3 = null;

    public height: number = null;

    @property({
        type: Number,
        tooltip: 'second',
        displayName: 'Duration Spawn (s)',
        step: 1
    })
    public durationSpawn: number = null;

    protected onLoad(): void {
        this.schedule(this.instancePipe, this.durationSpawn);
    }

    //Tạo node pipe ở ngoài màn hình và tự tùy chỉnh chiều cao
    instancePipe(): void{
        let instance = instantiate(this.pipe);

        this.height = Math.floor(Math.random() * 180);

        instance.setPosition(new Vec3(instance.position.x, instance.position.y + this.height, instance.position.z));

        this.node.insertChild(instance, 3);
    }
}