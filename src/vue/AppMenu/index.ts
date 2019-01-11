import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import Game from "../../cube/game";
import Option from "../../common/option";
import TuneMenu from "../TuneMenu";

@Component({
  template: require("./index.html"),
  components: {
    "tune-menu": TuneMenu
  }
})
export default class AppMenu extends Vue {
  @Inject("game")
  game: Game;

  @Inject("option")
  option: Option;

  @Prop({ required: true })
  value: boolean;

  @Watch("value")
  onValueChange(value: boolean) {
    this.$emit("input", value);
  }

  tune: boolean = false;
  data: boolean = false;

  mode(value: string) {
    this.option.mode = value;
    this.$emit("input", false);
  }

  reset() {
    let storage = window.localStorage;
    storage.clear();
    window.location.reload();
  }

  fullscreen() {
    if (this.option.fullscreen) {
      this.option.fullscreen = false;
      let cfs = document as any;
      if (cfs.exitFullscreen) {
        cfs.exitFullscreen();
      } else if (cfs.webkitCancelFullScreen) {
        cfs.webkitCancelFullScreen();
      } else {
        cfs.msExitFullscreen();
      }
    } else {
      this.option.fullscreen = true;
      let el = document.documentElement as any;
      let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
      if (typeof rfs != "undefined" && rfs) {
        rfs.call(el);
      }
    }
  }
}
