import os


def listar_arquivos_e_pastas(caminho, prefixo=''):
    arquivos_e_pastas = os.listdir(caminho)
    arquivos_e_pastas = [item for item in arquivos_e_pastas if item not in (
        'node_modules', 'db', '.vscode', '.git')]

    for i, item in enumerate(arquivos_e_pastas):
        caminho_item = os.path.join(caminho, item)
        eh_ultimo = (i == len(arquivos_e_pastas) - 1)

        if os.path.isdir(caminho_item):
            print(prefixo + '|- ' + item)
            if eh_ultimo:
                listar_arquivos_e_pastas(caminho_item, prefixo + '   ')
            else:
                listar_arquivos_e_pastas(caminho_item, prefixo + '|  ')
        else:
            print(prefixo + '|- ' + item)


caminho_atual = os.getcwd()  # Obtém o diretório atual
print(caminho_atual)
listar_arquivos_e_pastas(caminho_atual)
