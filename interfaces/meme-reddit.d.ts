export interface MemeRedditMain {

        kind: string,
        data: {
          after: string,
          children : MemeRedditChildern[] 
        }

}

export interface MemeRedditChildern {
    data : {
        id: string,
        subreddit : string
        title: string,
        post_hint: string,
        created: number,
        url_overridden_by_dest: string,
        author: string,
        subreddit_name_prefixed: string,
        ups: number
    }
}