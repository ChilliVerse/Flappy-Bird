
import { _decorator, Component, director, Label, labelAssembler, Node } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('ScoreManager')
export class ScoreManager extends Component {
    static instance: ScoreManager;

    @property({
        group: {name: 'Score', id: '1'},
        type: Node,
        tooltip: 'high score label',
        displayName: 'High Score Label',
        visible: true
    })
    public _highScoreLabel: Node = null;

    @property({
        group: {name: 'Score', id: '1'},
        type: Node,
        tooltip: 'Current score',
        displayName: 'Score Playing',
        visible: true
    })
    public _scorePlaying: Node = null;

    private _highScoreDB: string;

    protected onLoad(): void {
        ScoreManager.instance = this;

        this._highScoreDB = localStorage.getItem('High Score');

        this.showHighScore();

        director.on('EndGame', this.setHighScore, this);

        director.on('Pass', this.upgradeScore, this);
    }

    //#region 
    //Lấy dữ liệu điểm cao nhất trong bộ nhớ nếu có
    getHighScore(): void{
        if(!this._highScoreDB){
            this._highScoreDB = '0';
        }
    }

    //Hiển thị điểm cao nhất lên màn hình
    showHighScore(): void{
        this.getHighScore();

        this._highScoreLabel.getComponent(Label).string = 'High Score: ' + this._highScoreDB;
    }

    //Cập nhật điểm cao nhất nếu phát hiện điểm chơi lớn hơn
    setHighScore(): void{
        let currentScore = this._scorePlaying.getComponent(Label).string;
        if(parseInt(this._highScoreDB) < parseInt(currentScore)){
            localStorage.setItem('High Score', currentScore)
        }
    }

    //Cộng điểm chơi hiện tại nếu bird bay qua ống
    upgradeScore(): void{
        let currentScore = parseInt(this._scorePlaying.getComponent(Label).string);

        currentScore += 1;
        this._scorePlaying.getComponent(Label).string = currentScore.toString();
    }
    //#endregion
}