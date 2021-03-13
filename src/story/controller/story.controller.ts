import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {StoryInterface} from "../interface/story.interface";
import {StoryService} from "../service/story.service";

@Controller('stories')
export class StoryController {
    constructor(
        private storyService: StoryService
    ){}

    @Get()
    getStories(){
        return this.storyService.getStories();
    }

    @Get(':slug')
    getOne(@Param('slug') slug: string){
      return this.storyService.findBySlug(slug);
    }

    @Post()
    create(@Body() body: StoryInterface){
        console.log(body);
        return this.storyService.create(body);
    }

    @Put(':id')
    updateOne(@Body() body: any, @Param('id')  id: number){
        return this.storyService.updateOne(id, body)
    }

    @Delete(':id')
    deleteOne(@Param('id') id: number){
        return this.storyService.deleteOne(id);
    }



}