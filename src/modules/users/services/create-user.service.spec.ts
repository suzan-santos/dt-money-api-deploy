import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { CreateUserService } from './create-user.service';
import { IUserRepository } from '../infra/repositories/user.repository.abstract';

describe('CreateUserService', () => {
  let service: CreateUserService;
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: IUserRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
  });

  describe('execute', () => {
    it('deve criar um usuário com sucesso', async () => {
      const createUserDTO = {
        name: 'João Silva',
        email: 'joao@email.com',
        password: '123456',
      };

      mockRepository.findByEmail.mockResolvedValue(null);
      mockRepository.create.mockResolvedValue({
        id: '123',
        name: 'João Silva',
        email: 'joao@email.com',
        password: 'hash_criptografado',
      });

      const result = await service.execute(createUserDTO);

      expect(mockRepository.findByEmail).toHaveBeenCalledWith('joao@email.com');
      expect(mockRepository.create).toHaveBeenCalled();
      expect(result.password).toBeUndefined();
    });

    it('deve lançar erro se email já existe', async () => {
      const createUserDTO = {
        name: 'João Silva',
        email: 'joao@email.com',
        password: '123456',
      };

      mockRepository.findByEmail.mockResolvedValue({
        id: '456',
        email: 'joao@email.com',
      });

      await expect(service.execute(createUserDTO)).rejects.toThrow(
        ConflictException,
      );
    });

    it('deve criptografar a senha antes de salvar', async () => {
      const createUserDTO = {
        name: 'João Silva',
        email: 'joao@email.com',
        password: '123456',
      };

      mockRepository.findByEmail.mockResolvedValue(null);
      mockRepository.create.mockResolvedValue({
        id: '123',
        name: 'João Silva',
        email: 'joao@email.com',
        password: 'hash_bcrypt',
      });

      await service.execute(createUserDTO);

      expect(mockRepository.create).toHaveBeenCalled();
      const callArgs = mockRepository.create.mock.calls[0][0];
      expect(callArgs.password).not.toBe('123456');
    });
  });
});