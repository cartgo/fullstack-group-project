package com.example.group;

import com.example.group.dao.UserRepository;
import com.example.group.model.User;
import com.example.group.service.impl.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;
    @InjectMocks
    private UserServiceImpl userService;
    @Test
    void findById(){
        final int id = 3;
        final User user = new User( "pink","pink@gmail.com","pink","cost manager");
        given(userRepository.findById(id)).willReturn(user);
        final User expected  =userService.findById(id);
        assertThat(expected).isNotNull();
    }

    @Test
    void updateUser() {
        final User user = new User( "pink","pink@gmail.com","pink","cost manager");
        given(userRepository.save(user)).willReturn(user);
        final User expected = userService.updateUser(user);
        assertThat(expected).isNotNull();
        verify(userRepository).save(any(User.class));
    }

    @Test
    void findAll() {
        List<User> datas = new ArrayList();
        datas.add(new User( "pink","pink@gmail.com","pink","cost manager"));
        datas.add(new User( "blue","blue@gmail.com","blue","manager"));
        given(userRepository.findAll()).willReturn(datas);
        List<User> expected = userService.findAll();
        assertEquals(expected, datas);
    }

    @Test
    void findByUsername(){
        final String username = "pink";
        final User user = new User( "pink","pink@gmail.com","pink","cost manager");
        given(userRepository.findByUsername(username)).willReturn(user);
        final User expected  =userService.findByUsername(username);
        assertThat(expected).isNotNull();
    }

    @Test
    void saveUser() {
        final User user = new User( "pink","pink@gmail.com","pink","cost manager");
        given(userRepository.save(user)).willAnswer(invocation -> invocation.getArgument(0));
        User savedUser = userService.saveUser(user);
        assertThat(savedUser).isNotNull();
        verify(userRepository).save(any(User.class));

    }

    @Test
    void deleteById() {
        final int userId=2;
        userService.deleteById(userId);
        userService.deleteById(userId);
        verify(userRepository, times(2)).deleteById(userId);
    }
}
