export class Urls{
    public BASE_URL : string = "http://localhost:8000";
    public ALBUM_URL : string = this.BASE_URL + "/album";
    public USER_URL : string = this.BASE_URL + "/user";
    public LOGIN_URL : string = this.BASE_URL + "/login";
    public PHOTO_URL : string = this.BASE_URL + "/photo";
    public ALBUM_LIKE_URL: string = this.BASE_URL + "/album/like"
    public ALBUM_UNLIKE_URL: string = this.BASE_URL + "/album/unlike"
    public PHOTO_LIKE_URL: string = this.BASE_URL + "/photo/like"
    public PHOTO_UNLIKE_URL: string = this.BASE_URL + "/photo/unlike"
    
    
}
