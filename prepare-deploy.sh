#!/bin/bash

# 🚀 Script de Preparação para Deploy
# Execute este script antes de fazer o deploy

echo "🚀 Preparando portfólio para deploy..."

# Criar diretório de deploy limpo
mkdir -p deploy
cd deploy

# Copiar arquivos essenciais
echo "📁 Copiando arquivos..."
cp ../index.html .
cp -r ../css .
cp -r ../js .
cp -r ../assets .

# Verificar se todos os arquivos existem
echo "✅ Verificando arquivos essenciais..."

files=(
    "index.html"
    "css/styles.css"
    "css/animations.css"
    "js/script-simple.js"
    "js/animations.js"
    "js/whatsapp-integration.js"
    "assets/images/Carol.jpeg"
)

missing_files=()

for file in "${files[@]}"; do
    if [ ! -f "$file" ]; then
        missing_files+=("$file")
        echo "❌ Arquivo não encontrado: $file"
    else
        echo "✅ $file"
    fi
done

if [ ${#missing_files[@]} -eq 0 ]; then
    echo ""
    echo "🎉 Todos os arquivos estão prontos para deploy!"
    echo ""
    echo "📋 Próximos passos:"
    echo "1. Comprima a pasta 'deploy' em um ZIP"
    echo "2. Acesse netlify.com"
    echo "3. Arraste o ZIP para fazer deploy"
    echo ""
    echo "🌐 Ou use GitHub:"
    echo "1. git init"
    echo "2. git add ."
    echo "3. git commit -m 'Deploy portfólio'"
    echo "4. git push origin main"
    echo ""
else
    echo ""
    echo "⚠️  Arquivos em falta:"
    for file in "${missing_files[@]}"; do
        echo "   - $file"
    done
    echo ""
    echo "Por favor, verifique os arquivos antes de continuar."
fi

echo "✨ Script concluído!"
