# Lume — prompts para Google Flow

## Referência visual

Use as imagens `hero-still.png`, `stage-detail.png` e `studio-still.png` como ingredientes de lugar, instrumento e estilo. Preserve a guitarra sunburst desgastada, balcão de nogueira, sombras teal e lâmpadas âmbar. Sem texto, logotipos ou música reconhecível.

## Clipe atual — vídeo de fundo e prova de scroll (10 s, 16:9)

O clipe gerado está em `media/lume-story.mp4`. Este mesmo take roda em loop no modo de fundo persistente e é sincronizado com a rolagem em `scroll.html` para demonstrar a técnica. A narrativa muda de capítulo mesmo que o take atual mostre apenas uma cena da guitarra e do músico.

## Prompt usado para o clipe atual

> Cinematic editorial film inside an independent instrument shop at warm closing time. Begin with a worn sunburst electric guitar on a walnut counter, then gently reveal a musician playing the instrument in the same intimate shop. Keep the camera movement slow and continuous, preserve the guitar's shape and finish, warm amber practical lights with muted teal shadows, shallow depth of field and restrained 35mm grain. No cuts, no text, no logos, no recognizable face, no music. 16:9.

## Variação futura — fundo em loop (8 s, 16:9)

> Cinematic product film in an independent instrument shop after closing. A worn sunburst electric guitar rests on a walnut counter in the foreground. Camera makes a very slow lateral dolly while warm tungsten practicals glow and a tiny amount of dust floats in the air. The guitar stays completely still and recognizable. Moody deep petrol-teal shadows, amber highlights, tactile wood and brushed metal, refined 35mm film grain, shallow depth of field. Keep the left 45 percent dark and visually quiet for white website text. No cuts, no text, no logos, no people, no music. End on a calm, loopable composition.

Repita com `studio-still.png` como referência de instrumento, sem mudar ambiente, luz nem lente. Gere três takes de 8 segundos com movimentos discretos. Edite em sequência e faça crossfades lentos; a página muda os textos sem sincronizar com o vídeo.

## Cenas para a narrativa por scroll (8 s por clipe, 16:9)

1. **O primeiro acorde:** da imagem de guitarra, aproximar lentamente das cordas e captadores, reflexo âmbar atravessando o verniz; câmera termina estável.
2. **A energia da sala:** da imagem de palco, um músico fora de foco ajusta um amplificador e acende uma luz do palco; nenhum rosto visível.
3. **Depois do ensaio:** do estúdio, mão toca uma nota em sintetizador analógico; movimento delicado, led pulsa, sem mãos deformadas.
4. **Uma voz para levar:** produto isolado no balcão, travelling termina com instrumento à direita e espaço limpo à esquerda para CTA.

Gere a primeira cena em Frames, usando o still correspondente como frame inicial. Gere as seguintes com o mesmo ingrediente de loja e look, ou fixe um frame inicial/final quando a versão do modelo oferecer suporte. Use clips sem áudio para a página controlar o áudio separadamente.

## Substituição no projeto

Troque as três camadas do hero em `index.html` por um único `<video autoplay muted loop playsinline>` com vídeo otimizado H.264/WebM. Para o modo por scroll, use `scroll-video-template.html` e exporte os quatro clipes como `media/scene-01.mp4` etc. Não use um MP4 longo com `currentTime` ligado ao scroll: scrub de vídeo comprimido tende a buscar mal em celular. Prefira cortes entre quatro clipes curtos.
