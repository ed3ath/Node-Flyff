QUEST_HEROJES_TRN2 = {
	title = 'IDS_PROPQUEST_INC_000525',
	character = 'MaDa_Lorein',
	end_character = 'MaFl_Radyon',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_ACROBAT' },
		previous_quest = 'QUEST_HEROJES_TRN1',
	},
	rewards = {
		gold = 0,
		exp = 0,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_RENSRING', quantity = 1, sex = 'Any', remove = false },
		},
		monsters = {
			{ id = 'MI_REN', quantity = 1 },
		},
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_RENSRING', monster_id = 'MI_REN', probability = '3000000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000526',
			'IDS_PROPQUEST_INC_000527',
			'IDS_PROPQUEST_INC_000528',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000529',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000530',
		},
		completed = {
			'IDS_PROPQUEST_INC_000531',
			'IDS_PROPQUEST_INC_000532',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000533',
		},
	}
}
