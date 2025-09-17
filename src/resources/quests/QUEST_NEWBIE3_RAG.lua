QUEST_NEWBIE3_RAG = {
	title = 'IDS_PROPQUEST_INC_002776',
	character = 'MaFl_Newbie',
	end_character = 'MaFl_Newbie',
	start_requirements = {
		min_level = 75,
		max_level = 129,
		job = { 'JOB_RANGER', 'JOB_RANGER_MASTER', 'JOB_RANGER_HERO' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_EVE_BXMRANGER90', quantity = 1, sex = 'Male' },
			{ id = 'II_SYS_SYS_EVE_BXFRANGER90', quantity = 1, sex = 'Female' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_EVE_NEWBIE03', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_002777',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_002778',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_002779',
		},
		completed = {
			'IDS_PROPQUEST_INC_002780',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_002781',
		},
	}
}
