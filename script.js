let move_speed = 3, grativy = 0.5;
let bird = document.querySelector('.bird');
let img = document.getElementById('bird-1');
let sound_point = new Audio('sounds effect/point.mp3');
let sound_die = new Audio('sounds effect/die(1).mp3');
let sound_win = new Audio('sounds effect/champion_clip.mp3');

// getting bird element properties
let bird_props = bird.getBoundingClientRect();

// This method returns DOMReact -> top, right, bottom, left, x, y, width and height
let background = document.querySelector('.background').getBoundingClientRect();

let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

let button = document.querySelector('.helpbutton'); // Replace 'button' with your button's selector

// button.addEventListener('click', function() {
//     alert('No one can save you from the purge');
// });


document.addEventListener('keydown', (e) => {
    
    if(e.key == 'h'){
        alert("You versus the Purge, there's no help!");    }
});
document.addEventListener('keydown', (e) => {
    
    if(e.key == 'a'){
        alert("It's all about the community!");    }
});



let game_state = 'Start';
img.style.display = 'none';
message.classList.add('messageStyle');


document.addEventListener('keydown', (e) => {
    
    if(e.key == 'Enter'  && game_state != 'Play'){
        document.querySelectorAll('.pipe_sprite').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        bird.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score : ';
        score_val.innerHTML = '0';
        message.classList.remove('messageStyle');
        play();
    }
});

document.addEventListener('touchstart', (e) => {
    if (game_state != 'Play') {
        document.querySelectorAll('.pipe_sprite').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        bird.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score: ';
        score_val.innerHTML = '0';
        message.classList.remove('messageStyle');
        play();
    } else {
        // Trigger jump action
        jump();
    }
});

function jump() {
    img.src = 'images/monDown.png';
    bird_dy = -7.6;
    sound_jump.play();
}


// document.addEventListener('mousedown', (e) => {
//     if(e.button == 0 && game_state != 'Play'){
//         document.querySelectorAll('.pipe_sprite').forEach((e) => {
//             e.remove();
//         });
//         img.style.display = 'block';
//         bird.style.top = '40vh';
//         game_state = 'Play';
//         message.innerHTML = '';
//         score_title.innerHTML = 'Score: ';
//         score_val.innerHTML = '0';
//         message.classList.remove('messageStyle');
//         play();
//     }
// });

function play(){
    function move(){
        if(game_state != 'Play') return;

        let pipe_sprite = document.querySelectorAll('.pipe_sprite');
        let all_coins = document.querySelectorAll('.purple_square');

        all_coins.forEach((element) => {
            let all_coins_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();

            if(all_coins_props.right <= 0){
                element.remove();
            }else{
                if(bird_props.left < all_coins_props.left + all_coins_props.width && bird_props.left + bird_props.width > all_coins_props.left && bird_props.top < all_coins_props.top + all_coins_props.height && bird_props.top + bird_props.height > all_coins_props.top){
                    // game_state = 'End';
                    // message.innerHTML = 'You were purged!'.fontcolor('red') + '<br><p style="font-size: 14px >Press Enter To Restart</p>';
                    // message.classList.add('messageStyle');
                    // img.style.display = 'none';
                    element.remove();
                    score_val.innerHTML =+ score_val.innerHTML + 5
                    sound_point.play();
                    return;
                }else{
                    if(all_coins_props.right < bird_props.left && all_coins_props.right + move_speed >= bird_props.left && element.increase_score == '1'){
                        score_val.innerHTML =+ score_val.innerHTML + 1;
                        sound_point.play();
                    }
                    element.style.left = all_coins_props.left - move_speed + 'px';

                }
            }
        });
        
        pipe_sprite.forEach((element) => {
            let pipe_sprite_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();

            if(pipe_sprite_props.right <= 0){
                element.remove();
            }else{
                if(bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width && bird_props.left + bird_props.width > pipe_sprite_props.left && bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height && bird_props.top + bird_props.height > pipe_sprite_props.top){
                    game_state = 'End';
                    message.innerHTML = 'You were purged!'.fontcolor('red') + '<br><p class="smalltext">Press Enter To Restart</p>';
                    message.classList.add('messageStyle');
                    img.style.display = 'none';
                    sound_die.play();
                    return;
                }else{
                    if(pipe_sprite_props.right < bird_props.left && pipe_sprite_props.right + move_speed >= bird_props.left && element.increase_score == '1'){
                        score_val.innerHTML =+ score_val.innerHTML + 1;
                        // sound_point.play();
                    }
                    element.style.left = pipe_sprite_props.left - move_speed + 'px';

                }
            }
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let bird_dy = 0;

    function apply_gravity(){
        if(game_state != 'Play') return;
        bird_dy = bird_dy + grativy;
        document.addEventListener('keydown', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'images/monDown.png';
                bird_dy = -7.6;
            }
        });
        document.addEventListener('mousedown', (e) => {
            if(e.button == 0 || e.key == ' '){
                img.src = 'images/monDown.png';
                bird_dy = -7.6;
            }
        });
        document.addEventListener('mouseup', (e) => {
            if(e.button == 0 || e.key == ' '){
                img.src = 'images/mon.png';
            }
        });

        document.addEventListener('keyup', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'images/mon.png';
            }
        });


        if(bird_props.top <= 0 || bird_props.bottom >= background.bottom){
            game_state = 'End';

            message.style.left = '28vw';
            // window.location.reload();
            message.classList.remove('messageStyle');
            sound_die.play();
            message.innerHTML = 'You were purged!'.fontcolor('red') + '<br><p class="smalltext">Press Enter To Restart</p>';
            message.classList.add('messageStyle');
            img.style.display = 'none';
            window.location.reload();
            // }, 4000); // 3000 milliseconds = 3
            
            return;
        }

        bird.style.top = bird_props.top + bird_dy + 'px';
        bird_props = bird.getBoundingClientRect();
        if(Number(score_val.innerHTML) >= 200){
            sound_win.play();
            game_state = 'End';
            message.style.display = 'flex';
            message.style.justifyContent = 'center';
            message.style.alignItems = 'center';
            message.innerHTML = "<div><h3 style='color:purple;'>Congratulations, You have survived John, I mean the purge</h3></div>";
            return;
        }
        requestAnimationFrame(apply_gravity);

    }
    requestAnimationFrame(apply_gravity);

    let pipe_seperation = 0;

    let pipe_gap = 35;

    function create_pipe(){
        if(game_state != 'Play') return;

        if(pipe_seperation > 90){
            pipe_seperation = 0;

            let pipe_posi = Math.floor(Math.random() * 43) + 8;
            let pipe_sprite_inv = document.createElement('div');
            pipe_sprite_inv.className = 'pipe_sprite';
            pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
            pipe_sprite_inv.style.left = '100vw';

            document.body.appendChild(pipe_sprite_inv);
            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
            pipe_sprite.style.left = '100vw';
            pipe_sprite.increase_score = '1';

            let purple_square = document.createElement('div');
            purple_square.className = 'purple_square';
            // Generate a random vertical position between 40vh and 60vh
            let square_posi = Math.floor(Math.random() * 21) + 40;
            purple_square.style.top = square_posi + 'vh';
            purple_square.style.left = '100vw';

            // Generate a random number between 1 and 3
            let style_num = Math.floor(Math.random() * 3) + 1;

            // Apply one of the three styles
            purple_square.classList.add('purple_square_style' + style_num)
            
            document.body.appendChild(purple_square);

            document.body.appendChild(pipe_sprite);
        }
        pipe_seperation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}
