class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
    else
      @errors = @user.errors.full_messages
      render "api/users/show", status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end

end
