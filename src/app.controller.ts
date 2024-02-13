import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly db: PrismaService
    ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }

  @Get('projects')
  listPojects(){
    return this.db.project.findMany({
      include: {
        leader: true
      }
    });
  }



  /*@Get('projects/:id/leader')
   async getLeader(@Param('id') projectId: string){
    const project = await this.db.project.findUniqueOrThrow({
      where: {id:parseInt(projectId)}
    })
    
  }*/


  @Get('projectswithnames')
  listProjectWithName(){
    return this.db.project.findMany({
      select:{
        title: true,
        leader:{ select: {name:true,salary:true}
        }
      }
    })
  }


}
