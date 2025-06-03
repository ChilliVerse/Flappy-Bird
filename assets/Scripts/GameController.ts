
import { _decorator, Component, director, Input, Node, RigidBody2D, input } from 'cc';
import { Bird } from './Bird';
import { Ground } from './Ground';
import { SpawnPipe } from './SpawnPipe';
const { ccclass, property } = _decorator;
 
@ccclass('GameController')
export class GameController extends Component {
    @property({
        type: Node,
        tooltip: 'Layout GameOver',
        displayName: 'Over Layour'
    })
    public overLayout: Node;

    @property({
        type: Node,
        tooltip: 'Get Ready Layout'
    })
    public readyLayout: Node;

    protected onLoad(): void {
        director.on('EndGame', this.stopGame, this);

        this.stopComponent();

        input.on(Input.EventType.TOUCH_START, this.startGame, this);
    }

    // #region
    stopGame(): void{
        this.overLayout.active = true;

        director.pause();
    }

    restartGame(): void{
        this.overLayout.active = false;

        let sceneName = director.getScene().name;
        director.loadScene('MainScene');
    }

    startGame(): void{
        this.readyLayout.active = false;
        director.resume();
    }

    stopComponent(): void{
        director.pause();
    }
    // #endregion
}