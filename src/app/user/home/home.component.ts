import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  @ViewChild('progressBar') progressBar!: ElementRef;
  @ViewChild('volumeSlider') volumeSlider!: ElementRef;

  videoDuration: number = 0;
  currentTime: number = 0;
  bufferedTime: number = 0;
  playbackRate: number = 1;
  isFullScreen: boolean = false;
  playlist: string[] = [
    'assets/amaran movie.mp4',
    'assets/Butterfly Full Video 2024-08-12 at 19.11.06.mp4',
    'assets/istockphoto-1753779792-640_adpp_is.mp4',
  ];
  currentVideoIndex: number = 0;

  ngAfterViewInit() {
    const video: HTMLVideoElement = this.videoPlayer.nativeElement;

    video.addEventListener('timeupdate', () => {
      this.currentTime = video.currentTime;
      this.updateProgressBar();
    });

    video.addEventListener('progress', () => {
      if (video.buffered.length > 0) {
        this.bufferedTime = video.buffered.end(0); 
      }
    });

    video.addEventListener('loadedmetadata', () => {
      this.videoDuration = video.duration;
    });

    video.addEventListener('ratechange', () => {
      this.playbackRate = video.playbackRate;
    });

    video.addEventListener('ended', () => {
      this.onEnded();
    });
  }

  onPlay() {
    console.log('Video is playing');
  }

  onPause() {
    console.log('Video is paused');
  }

  togglePlay() {
    const video: HTMLVideoElement = this.videoPlayer.nativeElement;
    video.paused ? video.play() : video.pause();
  }

  seekVideo(seconds: number) {
    const video: HTMLVideoElement = this.videoPlayer.nativeElement;
    video.currentTime += seconds;
  }

  updateProgressBar() {
    const progress = (this.currentTime / this.videoDuration) * 100;
    this.progressBar.nativeElement.style.width = `${progress}%`;
  }

  changeVolume(event: any) {
    const video: HTMLVideoElement = this.videoPlayer.nativeElement;
    video.volume = event.target.value;
  }

  changePlaybackRate(event: Event) {
    const video: HTMLVideoElement = this.videoPlayer.nativeElement;
    const selectElement = event.target as HTMLSelectElement;
    video.playbackRate = parseFloat(selectElement.value);
  }

  toggleFullScreen() {
    const videoContainer = this.videoPlayer.nativeElement.parentElement;
    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen();
      this.isFullScreen = true;
    } else {
      document.exitFullscreen();
      this.isFullScreen = false;
    }
  }

  playNext() {
    this.currentVideoIndex = (this.currentVideoIndex + 1) % this.playlist.length;
    this.loadVideo();
  }

  playPrevious() {
    this.currentVideoIndex = (this.currentVideoIndex - 1 + this.playlist.length) % this.playlist.length;
    this.loadVideo();
  }

  loadVideo() {
    const video: HTMLVideoElement = this.videoPlayer.nativeElement;
    video.src = this.playlist[this.currentVideoIndex];
    video.load();
    video.play();
  }

  onEnded() {
    console.log('Video has ended');
    this.playNext();
  }
}
