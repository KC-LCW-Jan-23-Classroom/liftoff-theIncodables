//package org.theincodables.rpgvibes.models.dto;
//
//import com.fasterxml.jackson.core.JsonParser;
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.DeserializationContext;
//import com.fasterxml.jackson.databind.JsonNode;
//import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
//import com.fasterxml.jackson.databind.node.IntNode;
//import com.fasterxml.jackson.databind.node.ShortNode;
//
//import java.io.IOException;
//
//public class LoginFormDeserializer extends StdDeserializer<LoginFormDTO> {
//
//    public LoginFormDeserializer() {
//        this(null);
//    }
//
//    public LoginFormDeserializer(Class<?> vc) {
//        super(vc);
//    }
//
//    @Override
//    public LoginFormDTO deserialize(JsonParser jp, DeserializationContext ctxt)
//            throws IOException, JsonProcessingException {
////        ObjectMapper mapper = new ObjectMapper();
////        User usr = mapper.readValue(jsonObj.toString(), User.class);
//
//        JsonNode node = jp.getCodec().readTree(jp);
//        String username = node.get("username").asText();
//        String password = node.get("password").asText();
//
//        return new LoginFormDTO(username, password);
//    }
//}
