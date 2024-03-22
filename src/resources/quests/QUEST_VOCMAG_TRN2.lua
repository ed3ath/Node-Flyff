QUEST_VOCMAG_TRN2 = {
	title = 'IDS_PROPQUEST_INC_000796',
	character = 'MaSa_Hee',
	end_character = 'MaFl_Hastan',
	start_requirements = {
		min_level = 15,
		max_level = 15,
		job = { 'JOB_VAGRANT' },
		previous_quest = 'QUEST_VOCMAG_TRN1',
	},
	rewards = {
		gold = 1500,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_QUE_NTSKILL', quantity = 1, sex = 'Any' },
			{ id = 'II_SYS_BLI_BLI_SAINTMORNING', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000797',
			'IDS_PROPQUEST_INC_000798',
			'IDS_PROPQUEST_INC_000799',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000800',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000801',
		},
		completed = {
			'IDS_PROPQUEST_INC_000802',
			'IDS_PROPQUEST_INC_000803',
			'IDS_PROPQUEST_INC_000804',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000805',
		},
	}
}
