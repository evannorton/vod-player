import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataLoaderService } from '../data-loader.service';
import { ShareDialogComponent, ShareDialogData } from '../share-dialog/share-dialog.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    public title: string = "";

    @Input()
    public currentTime: number = 0;

    @Input()
    public duration: number = 0;

    constructor(private loader: DataLoaderService, public dialog: MatDialog){
        if(loader.isLoaded){
            this.title = loader.broadcastData.title ?? "Untitled stream.";
        }
        else{
            loader.onLoad.subscribe((data) => {
                this.title = data.title ?? "Untitled stream.";
            });
        }
    }

    public share(){
        const dialogRef = this.dialog.open<ShareDialogComponent, ShareDialogData>(ShareDialogComponent, {
            data: {
                currentTime: this.currentTime,
                duration: this.duration,
                videoUrl: this.loader.broadcastData.videoUrl,
                dataUrl: this.loader.dataUrl,
                username: this.loader.broadcastData.username,
                title: this.loader.broadcastData.title
            },
        });
    }
}
