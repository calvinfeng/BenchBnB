require 'byebug'
require 'rack/utils'

class Api::BenchesController < ApplicationController

  def index
    query_bounds = Rack::Utils.parse_nested_query(params[:bounds])
    @benches = Bench.in_bounds(query_bounds)
    render :index
  end

  def create
    @bench = Bench.new(bench_params)
    if @bench.save
      render :index
    else
      render json: @bench.errors.full_messages, status: 422
    end
  end

  private
  def bench_params
    params.require(:bench).permit(:description, :lat, :lng)
  end
end
