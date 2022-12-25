package hello;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.LambdaLogger;

import java.util.Map;

public class Handler implements RequestHandler<Object, String>{
  @Override
  public String handleRequest(Object event, Context context)
  {

    return "Sending you signals from java!";
  }
}
