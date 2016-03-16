import MenuItem from '../../menu/menu-item.js';
import Component from '../../component.js';
import * as Fn from '../../utils/fn.js';

class AudioTrackMenuItem extends MenuItem {
  constructor(player, options) {
    var track = options.track;
    var tracks = player.audioTracks();

    // Modify options for parent MenuItem class's init.
    options.label = track.label || track.language || 'Unknown';
    options.selected = track.enabled;

    super(player, options);

    this.track = track;

    if (tracks) {
      var changeHandler = Fn.bind(this, this.handleTracksChange);

      tracks.addEventListener('change', changeHandler);
      this.on('dispose', function() {
        tracks.removeEventListener('change', changeHandler);
      });
    }
  }

  /**
   * Handle click on text track
   *
   * @method handleClick
   */
  handleClick(event) {
    var kind = this.track.kind;
    var tracks = this.player_.audioTracks();

    MenuItem.prototype.handleClick.call(this, event);

    if (!tracks) return;

    for (var i = 0; i < tracks.length; i++) {
      var track = tracks[i];

      if (track === this.track) {
        track.enabled = true;
      }
    }
  }

  /**
   * Handle text track change
   *
   * @method handleTracksChange
   */
  handleTracksChange(event) {
    this.selected(this.track.enabled);
  }
}

Component.registerComponent('AudioTrackMenuItem', AudioTrackMenuItem);
export default AudioTrackMenuItem;
