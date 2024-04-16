import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters } from '@nestjs/common';
import { RecipesService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

@Controller('recipe')
@UseFilters(new HttpExceptionFilter())
export class RecipeController {
  constructor(private readonly recipeService: RecipesService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Recipe created successfully.' })
  @ApiUnprocessableEntityResponse({ description: 'Recipe title already exists.' })
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Recipes retrieved successfully.'})
  findAll() {
    return this.recipeService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Recipe retrieved successfully.'})
  @ApiNotFoundResponse({ description: 'Recipe not found.' })
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Recipe deleted successfully.'})
  @ApiNotFoundResponse({ description: 'Recipe not found.' })
  @ApiUnprocessableEntityResponse({ description: 'Post title already exists.' })
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(+id, updateRecipeDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Recipe deleted successfully.'})
  @ApiNotFoundResponse({ description: 'Recipe not found.' })
  remove(@Param('id') id: string) {
    return this.recipeService.remove(+id);
  }
}
